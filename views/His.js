"use strict";

ComApp.Store.His = function (params) {
    var viewModel = {   
        frmkhuyenmai: function (e) {
            bullhorn._$element.css({ 'left': '45px', 'opacity': '0.5' });
            ComApp.app.navigate("KhuyenMai", { root: false });
        }
        , frmthumbnail: function (e) {
            bullhorn._$element.css({ 'left': '45px', 'opacity': '0.5' });
            ComApp.app.navigate("Thumbnail", { root: false });
        }
	}
	return viewModel
}