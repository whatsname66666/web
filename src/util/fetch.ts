// 类型定义
interface RequestConfig extends Omit<RequestInit, 'body'> {
  url: string;
  timeout?: number;
  body?: any;
}

interface ResponseData<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  originalResponse: Response;
}

interface HttpClientError extends Error {
  originalError?: Error;
  url?: string;
  config?: RequestConfig;
}

type RequestInterceptor = (config: RequestConfig) => Promise<RequestConfig> | RequestConfig;
type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

interface CancelToken {
  cancel: (reason?: string) => void;
  promise: Promise<void>;
}

// HTTP客户端类
class HttpClient {
  private baseURL: string;
  private requestInterceptors: RequestInterceptor[];
  private responseInterceptors: ResponseInterceptor[];
  private defaultOptions: Omit<RequestConfig, 'url'>; // 修复1: 移除url属性

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.defaultOptions = {
      headers: { 
        "Content-Type": "application/json" 
      } as Record<string, string>,
      timeout: 10000
    };
  }

  // 添加请求拦截器
  useRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    // 返回移除函数以便后续管理
    return (): void => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.requestInterceptors.splice(index, 1);
      }
    };
  }

  // 添加响应拦截器
  useResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    // 返回移除函数
    return (): void => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.responseInterceptors.splice(index, 1);
      }
    };
  }

  // 处理请求拦截器 - 添加错误处理
  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    try {
      let newConfig = { ...config };
      for (const interceptor of this.requestInterceptors) {
        newConfig = await interceptor(newConfig);
      }
      return newConfig;
    } catch (error) {
      console.error('Request interceptor error:', error);
      throw error;
    }
  }

  // 处理响应拦截器 - 添加错误处理
  private async applyResponseInterceptors(response: Response): Promise<Response> {
    try {
      let newResponse = response;
      for (const interceptor of this.responseInterceptors) {
        newResponse = await interceptor(newResponse);
      }
      return newResponse;
    } catch (error) {
      console.error('Response interceptor error:', error);
      throw error;
    }
  }

  // 超时控制函数
  private timeoutPromise<T>(ms: number, promise: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request timeout after ${ms}ms`));
      }, ms);
      
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    });
  }

  // 核心请求方法 - 改进版本
  async request<T = any>(url: string, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    // 修复2: 使用类型断言确保配置正确
    const config: RequestConfig = { 
      url, 
      ...this.defaultOptions, 
      ...options 
    } as RequestConfig;

    // 处理URL拼接，避免双斜杠
    const fullURL = this.baseURL + 
      (this.baseURL && url && !url.startsWith('/') && !this.baseURL.endsWith('/') ? '/' : '') + 
      (url || '');

    try {
      // 应用请求拦截器
      const finalConfig = await this.applyRequestInterceptors(config);
      
      // 分离fetch配置
      const { url: _, timeout, ...fetchConfig } = finalConfig;
      
      // 创建fetch promise
      const fetchPromise = fetch(fullURL, fetchConfig as RequestInit);
      
      // 应用超时控制
      const response = timeout ? 
        await this.timeoutPromise(timeout, fetchPromise) : 
        await fetchPromise;
      
      // 应用响应拦截器
      const finalResponse = await this.applyResponseInterceptors(response);
      
      if (!finalResponse.ok) {
        // 如果是401未授权，则清除token并跳转登录页
        // if (finalResponse.status === 401) {
        //     sessionStorage.removeItem('auth_token');
        //     // 这里使用路由跳转或window.location.href，根据你的项目情况选择
        //     window.location.href = '/login'; 
        // }
        throw new Error(`HTTP error! status: ${finalResponse.status}`);
      }

      // 根据Content-Type决定如何解析响应
      const contentType = finalResponse.headers.get('content-type');
      let data: any;
      
      if (contentType && contentType.includes('application/json')) {
        data = await finalResponse.json() as T;
      } else if (contentType && contentType.includes('text/')) {
        data = await finalResponse.text() as unknown as T;
      } else {
        data = await finalResponse.blob() as unknown as T;
      }
      
      return {
        data,
        status: finalResponse.status,
        statusText: finalResponse.statusText,
        headers: finalResponse.headers,
        originalResponse: finalResponse
      };
      
    } catch (error: unknown) { // 修复3: 明确catch参数类型
      console.log(error)
      console.error("Request failed:", error);
      
      // 创建统一的错误格式
      const enhancedError: HttpClientError = new Error(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
      enhancedError.originalError = error instanceof Error ? error : undefined;
      enhancedError.url = fullURL;
      enhancedError.config = config;
      
      throw enhancedError;
    }
  }

  // 快捷方法 - 改进版本
  get<T = any>(url: string, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  post<T = any>(url: string, data?: any, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    // 自动处理不同类型的请求体
    let body = data;
    if (data && typeof data === 'object' && !(data instanceof FormData)) {
      body = JSON.stringify(data);
    }
    
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body
    });
  }

  put<T = any>(url: string, data?: any, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    let body = data;
    if (data && typeof data === 'object' && !(data instanceof FormData)) {
      body = JSON.stringify(data);
    }
    
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body
    });
  }

  patch<T = any>(url: string, data?: any, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    let body = data;
    if (data && typeof data === 'object' && !(data instanceof FormData)) {
      body = JSON.stringify(data);
    }
    
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body
    });
  }

  delete<T = any>(url: string, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }

  // 支持文件上传
  upload<T = any>(url: string, formData: FormData, options: Partial<RequestConfig> = {}): Promise<ResponseData<T>> {
    // 移除Content-Type头，让浏览器自动设置
    const { headers, ...restOptions } = options;
    const { 'Content-Type': _, ...filteredHeaders } = headers as Record<string, string> || {};
    
    return this.request<T>(url, {
      ...restOptions,
      method: "POST",
      body: formData,
      headers: filteredHeaders
    });
  }

  // 取消请求支持
  createCancelToken(): CancelToken {
    let cancel!: (reason?: string) => void;
    const promise = new Promise<void>((resolve) => {
      cancel = (reason?: string) => {
        resolve();
      };
    });
    return { cancel, promise };
  }
}

const request = new HttpClient("http://localhost:3000"); 
// 添加认证拦截器
request.useRequestInterceptor(async (config) => {
  const token = sessionStorage.getItem('auth_token');
  if (token) {
    if (!config.headers) {
      config.headers = {} as Record<string, string>;
    }
    const headers = config.headers as Record<string, string>;
    headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 添加响应拦截器处理认证错误
request.useResponseInterceptor(async (response) => {
  if (response.status === 401) {
    // Token过期或无效，清除存储并跳转到登录页
    // sessionStorage.removeItem('auth_token');
    // window.location.href = '/login';
  }
  return response;
});

export {
  request,
};

// 使用示例：
/*
const http = new HttpClient("https://api.example.com");

// 添加拦截器
const removeInterceptor = http.useRequestInterceptor(async (config) => {
  console.log('Request interceptor:', config);
  // 添加认证token
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// 发送请求
try {
  const response = await http.get<User[]>('/users');
  console.log(response.data);
} catch (error) {
  console.error('Request failed:', error);
}

// 移除拦截器
removeInterceptor();
*/