//  function so sánh 2 số a và 
function sosanh(a, b) {
    if (a > b) {
        console.log("So a lon hon so b");
    } else {
        if ( a < b ) {
            console.log("a nho hon b");
        } else if ( a === b ) {
            console.log(" a bang b");
        }
    }
    switch(a) {
        case 1:
            console.log("So a = 1");
            break;
        case 2:
            console.log("So a = 2")
            break;
        case 3:
            console.log("So a = 3")
        default:
            // code block
    }
    if (a === 1) {
        console.log("So a = 1");
    }
    if (a === 2) {
        console.log("So a = 2");
    }
    if (a === 3) {
        console.log("So a = 3");
    }
}

sosanh(5, 3);


// add to cart
// -> chưa chọn mẫu
// -> chưa chọn màu
// -> thêm thành công
// -> phải đăng nhập