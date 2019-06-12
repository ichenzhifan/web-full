/**
 * this.request和this.response 
 * 是在VKoa类中createContext方法中初始化的
 */
module.exports = {
	get url() {
		return this.request.url;
	},

	get body() {
		return this.response.body;
	},

	set body(val) {
		this.response.body = val;
	},

	get method() {
		return this.request.method;
	}
};
