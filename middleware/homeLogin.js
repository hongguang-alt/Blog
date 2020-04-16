const guard = (req, res, next) => {
    //判断用户是否是登陆状态
    //如果是登陆状态，放行
    //如果不是登陆状态，清空然后放行
	if ( !req.session.username) {
        req.app.locals.userInfo = '';
        return next()
	} else {
		// 用户是登录状态 将请求放行
		next();
	}
}

module.exports = guard;