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
  sessionStorage.token = token
  console.log(state.token)
};
export const delToken = (state) =>{
  state.token = ''
  sessionStorage.removeItem('token')
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
