package org.KwonEunbi.api.user.service;

import org.KwonEunbi.api.user.domain.UserVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface UserService {
    String save(UserVO userVo);
    List<UserVO> all();
    Optional<UserVO> one(long id);
    String edit(UserVO userVo);
    String delete(long id);
    public Map<String, Object> signin(String username, String password);
    public String signup(UserVO user);
    public void delete(String username);
    public UserVO search(String username);
    public UserVO whoami(HttpServletRequest req);
    public String refresh(String username);
}