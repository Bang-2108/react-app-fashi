import React, { Component } from "react";
import FashionData from "./FashionData";

class Fashion extends Component {
    constructor(props) {
        super(props);

        const storedProducts = localStorage.getItem('products');
        let products = [];

        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            products = FashionData('products');
            localStorage.setItem('products', JSON.stringify(products));
        }

        this.state = {
            id: products.length > 0 ? parseInt(products[products.length - 1].id) + 1 : 1,
            name: "",
            name_category: "Thời trang nam",
            code: "",
            image: "",
            price: "",
            old_price: "",
            products: products,
            showForm: false // <-- thêm trạng thái mới để quản lý việc ẩn/hiện form
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const newProduct = {
            id: this.state.id,
            name: this.state.name,
            name_category: this.state.name_category,
            code: this.state.code,
            image: this.state.image,
            price: this.state.price,
            old_price: this.state.old_price
        };

        const updatedProducts = [...this.state.products, newProduct];

        this.setState({
            id: this.state.id + 1,
            name: "",
            name_category: "Thời trang nam",
            code: "",
            image: "",
            price: "",
            old_price: "",
            products: updatedProducts,
            showForm: false // <-- Sau khi thêm xong thì ẩn form đi
        }, () => {
            localStorage.setItem('products', JSON.stringify(this.state.products));
        });

        document.getElementById('image').value = '';
    }

    toggleForm() {
        this.setState((prevState) => ({
            showForm: !prevState.showForm
        }));
    }

    render() {
        return (
            <div className="container py-5">

                {/* Nút bấm hiển thị form */}
                <div className="text-center mb-4">
                    <button
                        className="btn btn-success btn-lg"
                        onClick={this.toggleForm}
                    >
                        {this.state.showForm ? "Đóng Form" : "Thêm sản phẩm"}
                    </button>
                </div>

                {/* Form thêm sản phẩm */}
                {this.state.showForm && (
                    <div className="card shadow-sm mb-5">
                        <div className="card-body">
                            <h3 className="mb-4 text-center">Thêm Sản Phẩm Mới</h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Nhập tên sản phẩm"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Danh mục</label>
                                        <select
                                            name="name_category"
                                            className="form-control"
                                            value={this.state.name_category}
                                            onChange={this.handleChange}
                                        >
                                            <option value="Thời trang nam">Thời trang nam</option>
                                            <option value="Thời trang nữ">Thời trang nữ</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Mã sản phẩm</label>
                                        <input
                                            type="text"
                                            name="code"
                                            className="form-control"
                                            placeholder="Nhập mã sản phẩm"
                                            value={this.state.code}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Ảnh sản phẩm</label>
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={this.handleImageChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Giá bán</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="form-control"
                                            placeholder="Nhập giá bán"
                                            value={this.state.price}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Giá cũ</label>
                                        <input
                                            type="number"
                                            name="old_price"
                                            className="form-control"
                                            placeholder="Nhập giá cũ"
                                            value={this.state.old_price}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-success btn-lg">
                                        Lưu sản phẩm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Danh sách sản phẩm */}
                <h3 className="mb-4">Danh Sách Sản Phẩm</h3>
                <div className="row">
                    {this.state.products.length === 0 ? (
                        <div className="col-12">
                            <p className="text-muted text-center">Chưa có sản phẩm nào</p>
                        </div>
                    ) : (
                        this.state.products.map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="card-img-top"
                                            style={{ height: "250px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                                        />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="text-muted mb-1">Mã: {product.code}</p>
                                        <p className="mb-2">Danh mục: {product.name_category}</p>
                                        <div className="mt-auto">
                                            <span className="text-danger font-weight-bold">{product.price} VND</span>
                                            {product.old_price && (
                                                <small className="text-muted ml-2"><del>{product.old_price} VND</del></small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default Fashion;
