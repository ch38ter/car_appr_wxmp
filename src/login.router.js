const axios = require("axios");

module.exports = async (req, reust) => {
	// 获取从客户端上传上来的key
	try {
		let { code } = req.body;
		let { appid, secret } = wxKey;
		let openid;
		if (!code) {
			return Promise.reject("没有code参数");
		}
		await axios
			.get("https://api.weixin.qq.com/sns/jscode2session", {
				params: {
					appid: appid,
					secret: secret,
					js_code: code,
					grant_type: "authorization_code",
				},
			})
			.then((response) => {
				if (response.data.errcode) {
					return Promise.reject("非法的用户凭证");
				}
				openid = response.data.openid;
			});
		let userinfo = await searchUserOpenId(openid);
		if (userinfo.length !== 0) {
			reust.send(senf.init(200, userinfo[0]));
		} else {
			// 创建用户
			let creatUserinfoStatus = await CreateUserinfo({
				hash: uuid.v4(),
				name: "",
				openid: openid,
				avatar:
					"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
			});
			console.log("creatUserinfoStatus", creatUserinfoStatus);
			reust.send(senf.init(200, creatUserinfoStatus));
		}
		console.log("userinfo", userinfo);
	} catch (err) {
		// 用户没有被创建等...
		console.log("err", err);
		reust.send(senf.init(400, err || "请检查网络环境"));
	}
};

// 检查是否有openid如果有的话就直接查数据没有的话就弹登录
function searchUserOpenId(openid) {
	return new Promise((resolve, reject) => {
		// 查找用户
		let sql = db.senf.data.user.AuthUser;
		db.query(sql, [`%${openid}%`], (err, results) => {
			resolve(results);
		});
	});
}

// 创建用户信息
function CreateUserinfo(userinfo) {
	if (userinfo.length < 5) {
		return Promise.reject();
	}
	console.log("userinfo", userinfo);
	// 创建用户
	return new Promise((resolve, reject) => {
		let sql = db.senf.data.user.createUser;
		// 查找用户
		db.query(
			sql,
			[
				userinfo.name,
				userinfo.openid,
				userinfo.avatar,
				userinfo.hash,
				new Date(),
			],
			(err, results) => {
				console.log("err", err);
				if (err) {
					reject("创建用户失败");
				} else {
					resolve(userinfo);
				}
			}
		);
	});
}

