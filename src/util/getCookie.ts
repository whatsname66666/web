//let str = "EQOIWJOIJO=JOISJOJDO;IIHAIIB=hfoajspj;asdashfosjfaj=aosjdohqnzlmc";
//获取cookie
interface CookieObjInterface {
  [key: string]: string;
}
export function ParamsCookie(data: string): CookieObjInterface | void {
  let getCookie: [...string[]] = data.split(";");
  if (getCookie.length === 0) return;
  let CookieObj: CookieObjInterface = {};
  for (let i of getCookie) {
    let [key, value] = i.split("=");
    CookieObj[key] = value;
  }
  return CookieObj;
}
