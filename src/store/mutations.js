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

