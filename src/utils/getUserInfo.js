const getUserInfo = () => {
    const userInfoString = localStorage.getItem('user');
    if (userInfoString) {
      return JSON.parse(userInfoString);
    }
    return null;
  };
  
  const isManager = () => {
    const userInfo = getUserInfo();
    return userInfo && userInfo.role && userInfo.role.roleName === 'manager';
  };
  
  const isEmployee = () => {
    const userInfo = getUserInfo();
    return userInfo && userInfo.role && userInfo.role.roleName === 'employee';
  };
  
const getUserRole = ()=> {
    const userdata = getUserInfo()
    if(userdata) {
      return userdata.role.roleName
    }
    return null
}

  export { getUserInfo, isManager, isEmployee,getUserRole };