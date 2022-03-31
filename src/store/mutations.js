export const setIsAuthenticated =(state,data) => {
  state.isAuthenticated = data
};
export const setUser = (state,data) => {
  state.user = data
};
export const getlist_id = (state,list_id) => {
  state.list_id = list_id
};
export const setToken = (state,token) =>{
  state.token = token
  localStorage.token = token
};
export const delToken = (state) =>{
  state.token = ''
  localStorage.removeItem('token')
}
export const setStateurl = (state,stateurl) =>{
  state.stateurl = stateurl
};
export const delStateurl = (state) =>{
  state.stateurl = ''
}
export const menuBtn = (state,isCollapse) =>{
  state.isCollapse = isCollapse
}
export const sickNess = (state,sickNess1) =>{
  state.sickNess1 = sickNess1
}
export const sickIndex = (state,index) =>{
  state.index = index
}
export const sickIdx = (state,idx) =>{
  state.idx = idx
}
export const inputName = (state,input_name) =>{
  state.input_name = input_name
}
export const hotName = (state,hot_name) =>{
  state.hot_name = hot_name
}
export const crumbsarr = (state,crumbsarr) =>{
  state.crumbsarr = crumbsarr
}
export const barckArr = (state,barckArr) =>{
  state.barckArr = barckArr
}
export const cdssInfo = (state,cdssInfo) =>{
  state.cdssInfo = cdssInfo
}
export const is_pom = (state,is_pom) =>{
  state.is_pom = is_pom
}
