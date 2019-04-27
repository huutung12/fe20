$(document).ready(function () {
    var nguoiDungSV = new NguoiDungServices();

    LayDanhSachNguoiDung();

    function LayDanhSachNguoiDung() {
        nguoiDungSV.layDanhSachNguoiDung()
            .done(function (res) {
                localStorage.setItem("DSNguoiDung", JSON.stringify(res));
                TaoBang(res);
                console.log(res);
            })
            .fail(function (error) {
                console.log(error);
            });
    }

    function TaoBang(mang) {
        var content = "";
        // for (var i = 0; i < mang.length; i++) {
        //     content += `
        //     <tr>
        //         <td>${i + 1}</td>
        //         <td>${mang[i].TaiKhoan}</td>
        //         <td>${mang[i].MatKhau}</td>
        //         <td>${mang[i].HoTen}</td>
        //         <td>${mang[i].Email}</td>
        //         <td>${mang[i].SoDT}</td>
        //         <td>${mang[i].TenLoaiNguoiDung}</td>
        //     </tr>
        //     `
        // }

        mang.map(function (item, index) {
            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                <button id="btnSua" data-taikhoan="${item.TaiKhoan}" class="btn btn-success" data-toggle="modal" data-target="#myModal">
                Sửa
                </button>
                <button id="btnXoa" data-taikhoan="${item.TaiKhoan}" class="btn btn-danger">
                Xóa
                </button>
                </td>
            </tr>
            `

        })

        $('#tblDanhSachNguoiDung').html(content);
    }

    $('#btnThemNguoiDung').click(function () {

        BtnSuaVaCapNhat('Thêm Người Dùng', 'Thêm Mới', 'btnThem');

    })



    $('body').delegate("#btnThem", "click", function () {
        var TaiKhoan = $("#TaiKhoan").val();
        var HoTen = $("#HoTen").val();
        var MatKhau = $("#MatKhau").val();
        var Email = $("#Email").val();
        var SoDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDungThem = new NguoiDungThem(TaiKhoan, MatKhau, HoTen, Email, SoDienThoai, loaiNguoiDung);

        nguoiDungSV.themNguoiDung(nguoiDungThem);
    })

    $('body').delegate('#btnXoa','click', function(){
        var TaiKhoanXoa = $(this).data('taikhoan');
        nguoiDungSV.xoaNguoiDung(TaiKhoanXoa);

    })
    
    $('body').delegate("#btnCapNhat",'click', function(){
        var TaiKhoan = $("#TaiKhoan").val();
        var MatKhau = $("#MatKhau").val();
        var HoTen = $("#HoTen").val();
        var Email = $("#Email").val();
        var SoDienThoai = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDungCapNhat = new NguoiDungThem(TaiKhoan, MatKhau, HoTen, Email, SoDienThoai, loaiNguoiDung);

        nguoiDungSV.capNhatNguoiDung(nguoiDungCapNhat);

    })

    $('body').delegate('#btnSua','click',function(){
        BtnSuaVaCapNhat('Cập Nhật Người Dùng', 'Cập Nhật', 'btnCapNhat');
        var TaiKhoanSua = $(this).data('taikhoan');
        var ngDung = nguoiDungSV.layThongTinNguoiDung(TaiKhoanSua);
        
        $('#TaiKhoan').attr('disable','disable')

        $('#TaiKhoan').val(ngDung.TaiKhoan);
        $('#HoTen').val(ngDung.HoTen);
        $('#MatKhau').val(ngDung.MatKhau);
        $('#Email').val(ngDung.Email); 
        $('#SoDienThoai').val(ngDung.SoDT);
        $('#MloaiNguoiDun').val(ngDung.loaiNguoiDung);
    })

    function BtnSuaVaCapNhat(title, btnContent, btnID){
        $('.modal-title').html(title);

        var footer = `
        <button id="${btnID}" class="btn btn-success">
              <i class="fa fa-plus mr-1"></i>
              ${btnContent}
        </button>
        `
        $('.modal-footer').html(footer);
    }


});
