﻿var gbM = function (msg,__a) {
    //var test = DevExpress.localization.message.localizeString("@" + msg);
    try {
        if (__a) {
            return DevExpress.localization.message._dictionary[_$locate][msg];
        } else {
            return Globalize.formatMessage(msg);
        }
    }
    catch (err) {
        return "@@@text"
    }
}, _gbM = function (data) {
    DevExpress.localization.loadMessages(data);
}, _Tien = function (val, d) {
    return Globalize.formatCurrency(val, gbM('_$GL'), {
        maximumFractionDigits: d
    })
}, _TienUSD = function (val, d) {//test culture
    return Globalize.formatCurrency(val, "USD", {
        maximumFractionDigits: d
    })
}

function ExLanguages() {
    _gbM({
        vi: {

            "_$GL":"VND",
            "signIn": "Đăng nhập",
            "signOut": "Đăng xuất",
            "photo": "Hình ảnh",
            "username": "Họ & Tên",
            "userinfo": "Thông Tin Cá Nhân",
            "gender": "Giới Tính",
            "male": "Nam", "female": "Nữ",
            "require": "Cần nhập thông tin",
            "confirmdel": "Bạn có chắc là muốn xóa?", "notmatchpass": "'Mật khẩu' và 'Xác nhận mật khẩu' không khớp",
            "dupinfo": "Lỗi trùng thông tin!",
            "confirmation": "Xác nhận là bạn muốn tiếp tục?",
            "changepass": "Đổi Mật Khẩu",
            "oldpass": "Mật khẩu hiện tại",
            "newpass": "Mật khẩu mới",
            "renewpass": "Xác nhận mật khẩu",
            "wrongpass": "Mật khẩu sai",
            "defacc": "Đây là tài khoản dành riêng cho Quý khách<br/>Thông tin đăng nhập thay đổi được ở chức năng Quản lý Tài Khoản<br/>Nhấn nút Đăng nhập để tiếp tục ...",

            "404Close": "Thoát",
            "404Retry": "Thử Lại",
            "404Msg": "Máy chủ đang bận hoặc trong tình trạng bảo trì. Vui lòng thử lại",
            "mSetUp":"Khởi Tạo Hệ Thống",
            "S0_000": "Cập nhật phiên bản mới ...",
            "S0_001": "STT",
            "S0_002": "Mã",
            "S0_003": "Tên",
            "S0_004": "Thêm Mới",
            "S0_005": "Ghi Chú",
            "S0_006": "Chỉnh Sửa",
            "S0_007": "Lỗi trùng Mã",
            "S0_008": "Lỗi trùng Tên",
            "S0_009": "Hàng hóa - Sản Phẩm",
            "S0_010": "Quản Lý - Đơn Hàng",
            "S0_011": "Khuyến Mãi - Quà Tặng",
            "S0_012": "Tài Khoản Người Dùng",
            "S0_013": "Xin lỗi! hệ thống tạm thời ngừng tiếp nhận đơn hàng ...",
            "S0_014": "Thành thật xin lỗi! Các món ăn này đã hết hàng, hoặc ngừng bán. Vui lòng xóa chúng <span style='color:red'>(nhấn vào hình thùng rác màu đỏ)</span> và tiếp tục đặt hàng.",

            "S2_001": "Đơn Đặt Hàng",
            "S2_002": "Hiện chưa có đơn đặt hàng",
            "S2_003": "Chọn thời gian đặt hàng",
            "S2_004": "Từ ngày",
            "S2_005": "Đến ngày",
            "S2_006": "Đơn Hàng",
            "S2_007": "Đặt hàng", "S2_0071": "Chờ duyệt", "S2_0072": "Giao hàng", "S2_0073": "Hoàn tất", "S2_0074": "Chấp nhận", "S2_0075": "Đóng gói", "S2_0076": "Giao hỏng",
            "S2_012": "Hủy bỏ", "S2_0121": "Từ chối", "S2_0122": "Hết hàng", "S2_0123": "Trả về",
            "S2_008": "THÔNG TIN LIÊN LẠC",
            "S2_009": "Hủy Đơn Hàng",
            "S2_0091": "Bạn ơi! Bạn có thu hồi quyết định hủy đơn hàng này không?",
            "S2_010": "Chọn",
            "S2_0101": "Chọn Sản Phẩm",
            "S2_011": "Bạn có muốn giữ lại các chỉnh sửa hiện tại của đơn hàng?",
            "S2_013": "LỊCH SỬ ĐẶT HÀNG",

            "S3_001": "Khuyến Mãi",
            "S3_002": "Sắp tưng bừng khuyến mãi tri ân khách hàng",
        },
        en: {
            "_$GL": "USD",
            "signIn": "Sign In",
            "signOut": "Sign Out",
            "photo": "User Photo",
            "username": "Họ & Tên",
            "userinfo": "User Information",
            "gender": "Gender",
            "male": "Male", "female": "Female",
            "require": "Need to enter information",
            "confirmdel": "Are you sure to delete?","notmatchpass": "'Password' and 'Confirm Password' do not match",
            "dupinfo": "Duplicate information!",
            "confirmation": "Confirm that you want to continue?",
            "changepass": "Change Password",
            "oldpass": "Current password",
            "newpass": "New password",
            "renewpass": "Confirm password",
            "wrongpass": "Wrong password",
            "defacc": "This is a special account for you <br/>Login information can be changed in the Account Management function<br/>Press button Login to continue ...",

            "404Close": "Exit",
            "404Retry": "Retry",
            "404Msg": "The server is busy or in a maintenance state. Please try again.",
            "mSetUp": "System Initialize",
            "S0_000": "Updating new version ...",
            "S0_001": "NO.",
            "S0_002": "Code",
            "S0_003": "Name",
            "S0_004": "Add New",
            "S0_005": "Notes",
            "S0_006": "Modify",
            "S0_007": "Duplicate Code error",
            "S0_008": "Duplicate Name error",
            "S0_009": "Production",
            "S0_010": "Order Management",
            "S0_011": "Discount - Gift",
            "S0_012": "User Account",
            "S0_013": "Sorry! the system temporarily stops receiving orders ...",
            "S0_014": "These dishes are out of stock, or stop selling. Please delete them <span style='color:red'>(click on the Red trash can image)</span> and continue ordering.",
            
            "S2_001": "Order Sheet",
            "S2_002": "No order",
            "S2_003": "Chose date place order",
            "S2_004": "From date",
            "S2_005": "To date",
            "S2_006": "Order Detail",
            "S2_007": "Order", "S2_0071": "Wait approving", "S2_0072": "Shipping", "S2_0073": "Done", "S2_0074": "Approved", "S2_0075": "Packing", "S2_0076": "Delivery fail",
            "S2_012": "Cancel", "S2_0121": "Refused", "S2_0122": "Out of sale", "S2_0123": "Return",
            "S2_008": "CONTACT INFORMATION",
            "S2_009": "Cancel This Order",
            "S2_0091": "Hi Friend! Do you want to keep this Order?",
            "S2_010": "Chose",
            "S2_0101": "Chose Production",
            "S2_011": "Do you want to keep changes of current order?",
            "S2_013": "ORDER HISTORY",

            "S3_001": "Self Off",
            "S3_002": "Big sale coming soon ...",
        }
    });
}
ExLanguages();