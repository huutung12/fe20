function NguoiDungServices() {

    this.layDanhSachNguoiDung = function () {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
            // .done(function (res) {
            //     this.DSNguoiDung = res;
            //     TaoBang(this.DSNguoiDung);
            // })
            // .fail(function (error) {
            //     console.log(error);
            // })

           
    }

    this.themNguoiDung = function(nguoiDung){
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung,
        })
            .done(function (res) {
                location.reload();
            })
            .fail(function (error) {
                console.log(error);
            })
    }
    
    this.capNhatNguoiDung = function(nguoiDung){
        var ngDung = JSON.stringify(nguoiDung)
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: ngDung,
            contentType: 'application/json',
            dataType: 'JSON',
        })
            .done(function(done){
                location.reload();
            })
            .fail(function (error) {
            })

    }

    this.xoaNguoiDung = function(TaiKhoan){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${TaiKhoan}`,
            type: "DELETE",
        })
            .done(function(data){
                location.reload();
            })
            .fail(function (error) {
                console.log(error);
            })
    }

    this.layThongTinNguoiDung = function(taiKhoan){
        var DSND = JSON.parse(localStorage.getItem("DSNguoiDung"));

        var nguoiDung;

        // DSND.map(function(item){
        //     if(item.TaiKhoan === taiKhoan){
        //         nguoiDung = item;
        //         return nguoiDung;
        //     }
            
        // });
        // return nguoiDung;

        //  Hàm Tìm
            return DSND.find(function(item){
                return item.TaiKhoan === taiKhoan;
            })


    }
}