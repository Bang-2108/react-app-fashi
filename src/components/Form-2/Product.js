import React, { Component } from "react";
import Data from "./Data"; // nhớ import DataClothes nha

class Product extends Component {
    constructor(props) {
    super(props);

    const storedProducts = localStorage.getItem('products');
    let products = [];

    if (storedProducts) {
        products = JSON.parse(storedProducts);
    } else {
        products = Data('products'); // Nếu localStorage chưa có thì lấy từ DataClothes
        localStorage.setItem('products', JSON.stringify(products)); // Lưu vào localStorage luôn
    }

    this.state = {
        id: products.length > 0 ? parseInt(products[products.length - 1].id) + 1 : 1,
        name: "",
        name_category: "Thời trang nam",
        code: "",
        image: "",
        price: "",
        old_price: "",
        products: products
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    

    const updatedProducts = this.state.products.slice(); // copy mảng
    updatedProducts.push(newProduct); // thêm sản phẩm mới


    this.setState({
        id: this.state.id + 1,
        name: "",
        name_category: "Thời trang nam",
        code: "",
        image: "",
        price: "",
        old_price: "",
        products: updatedProducts
    }, () => {
        // Sau khi setState xong thì lưu vào localStorage
        localStorage.setItem('products', JSON.stringify(this.state.products));
    });

    // Reset file input sau khi submit
    document.getElementById('image').value = '';
    }

    render() {
    return (
        <div className="container">
        <div className="row">
            {/* Form thêm sản phẩm */}
            <div className="col-sm-4">
            <div id="form" className="card p-3 mb-4">
                <h4 className="mb-3">Thêm sản phẩm mới</h4>
                <div className="form-group">
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
value={this.state.name}
                    onChange={this.handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="name_category">Danh mục</label>
                <select
                    className="form-control"
                    id="name_category"
                    name="name_category"
                    value={this.state.name_category}
                    onChange={this.handleChange}
                >
                    <option value="Thời trang nam">Thời trang nam</option>
                    <option value="Thời trang nữ">Thời trang nữ</option>
                </select>
                </div>
                <div className="form-group">
                <label htmlFor="code">Mã sản phẩm</label>
                <input
                    className="form-control"
                    id="code"
                    name="code"
                    placeholder="Nhập mã sản phẩm"
                    value={this.state.code}
                    onChange={this.handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="price">Giá bán</label>
                <input
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Nhập giá bán"
                    value={this.state.price}
                    onChange={this.handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="old_price">Giá cũ</label>
                <input
                    className="form-control"
                    id="old_price"
                    name="old_price"
                    placeholder="Nhập giá cũ"
                    value={this.state.old_price}
                    onChange={this.handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="image">Ảnh sản phẩm</label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={this.handleImageChange}
                />
                </div>
                <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={this.handleSubmit}
                >
                Thêm sản phẩm
                </button>
            </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="col-sm-8">
            <div className="card p-3">
                <h4 className="mb-3">Danh sách sản phẩm</h4>
                {this.state.products.length === 0 ? (
                <p className="text-muted">Chưa có sản phẩm nào</p>
                ) : (
                <div className="row">
{this.state.products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                        {product.image && (
                            <img
                            src={product.image}
                            alt={product.name}
                            className="card-img-top"
                            style={{ height: "200px", objectFit: "cover" }}
                            />
                        )}
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">
                            <small className="text-muted">Mã: {product.code}</small>
                            </p>
                            <p className="card-text">
                            Danh mục: {product.name_category}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span className="text-danger font-weight-bold">
                                {product.price} VND
                                </span>
                                {product.old_price && (
                                <span className="text-muted ml-2">
                                    <del>{product.old_price} VND</del>
                                </span>
                                )}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    }
}

export default Product;