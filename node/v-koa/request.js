/**
 * this.req, 是在VKoa类中createContext方法中初始化的
 */
module.exports = {
	get url() {
		return this.req.url;
	},

	get method() {
		return this.req.method.toLowerCase();
	}
};
