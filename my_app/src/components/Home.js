const Home = () => {
    return(
        <>
        <div className="home-container">

            <h3 className="my-3">Project-React</h3>
            <p>Sử dụng API từ trang web <a href="https:reqres.in/">https:reqres.in/</a> để tạo ra website</p>
            <p>Sử dụng thư viện React để tạo ra một màn hình website cơ bản</p>
            <ul>
                <li>Đăng nhập</li>
                <li>Thêm user</li>
                <li>Sửa user</li>
                <li>Xóa user</li>
                <li>Hiển thị tất cả user</li>
                <li>Tiềm kiếm user theo email</li>
                <li>Sắp xếp theo Fisrt Name,ID,Email</li>
                <li>Import, Export từ file .CSV theo đúng định dạng</li>
            </ul>
        </div>
        <p>css website gọn dàng dễ nhìn</p>
        </>
    )
}
export default Home;