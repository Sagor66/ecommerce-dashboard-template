import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const Add_product = () => {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState();
  const [dummyimgs, setDummyimgs] = useState([
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
    { img: user },
  ]);
  const [reviews, setReviews] = useState([""]);
  const [ratings, setRatings] = useState([""]);
  const [variants, setVariants] = useState([
    { color: "", code: "", imgId: "", size: "", stock: "", sku: "" },
  ]);

  // axios.get('http://localhost:9001/api/products/all')
  // .then(data => console.log(data.data))

  const onChange = (e) => {
    setValue(e);
  };

  //	image upload

  const _handleImgChange = (e, i) => {
    e.preventDefault();
    let reader = new FileReader();
    const image = e.target.files[0];

    reader.onload = () => {
      dummyimgs[i].img = reader.result;
      setFile({ file: file });
      setDummyimgs(dummyimgs);
    };
    reader.readAsDataURL(image);
  };

  // Review functions
  const handleReviewChange = (index, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = value;
    setReviews(updatedReviews);
  };

  const handleAddReview = () => {
    setReviews([...reviews, ""]);
  };

  const handleRemoveReview = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  // Rating functions
  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = parseFloat(value);
    setRatings(updatedRatings);
  };

  const handleAddRating = () => {
    setRatings([...ratings, ""]);
  };

  const handleRemoveRating = (index) => {
    const updatedRatings = [...ratings];
    updatedRatings.splice(index, 1);
    setRatings(updatedRatings);
  };

  // Variant Functions
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: "", code: "", imgId: "", size: "", stock: "", sku: "" }]);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleValidSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.product_name.value;
    const productBrand = form.product_brand.value;
    const productType = form.product_type.value;
    const productCategory = form.product_category.value;
    const price = form.price.value;
    const discount = form.discount.value;
    const sale = form.sale.value;
    const description = value;

    const formInputs = {
      productName,
      productBrand,
      productType,
      productCategory,
      price,
      discount,
      sale,
      reviews,
      ratings,
			variants,
      dummyimgs: dummyimgs,
      description,
    };

    console.log(formInputs);
  };

  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Physical" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Product</h5>
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  <Col xl="5">
                    <div className="add-product">
                      <Row>
                        <Col xl="9 xl-50" sm="6 col-9">
                          <img
                            src={one}
                            alt=""
                            className="img-fluid image_zoom_1 blur-up lazyloaded"
                          />
                        </Col>
                        <Col xl="3 xl-50" sm="6 col-3">
                          <ul className="file-upload-product">
                            {dummyimgs.map((res, i) => {
                              return (
                                <li key={i}>
                                  <div className="box-input-file">
                                    <Input
                                      className="upload"
                                      type="file"
                                      onChange={(e) => _handleImgChange(e, i)}
                                    />
                                    <img
                                      alt=""
                                      src={res.img}
                                      style={{ width: 50, height: 50 }}
                                    />
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xl="7">
                    <Form
                      className="needs-validation add-product-form"
                      onSubmit={handleValidSubmit}
                    >
                      <div className="form form-label-center">
                        {/* Product Name */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Name :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_name"
                              id="validationCustom01"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Brand */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Brand :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_brand"
                              id="validationCustom02"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Type */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Type :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_type"
                              id="validationCustom02"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Category */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Product Category :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_category"
                              id="validationCustom02"
                              type="text"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Price */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Price :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="price"
                              id="validationCustom02"
                              type="number"
                              required
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Discount */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Discount :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="discount"
                              id="validationCustom02"
                              type="number"
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Sale */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">
                            Sale :
                          </Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control mb-0"
                              name="sale"
                              id="validationCustom02"
                              type="number"
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>
                        {/* Product Ratings */}
                        <div>
                          {ratings.map((rating, i) => (
                            <FormGroup className="form-group mb-3 row">
                              <Label className="col-xl-3 col-sm-4 mb-0">
                                Rating {i + 1} :
                              </Label>
                              <div className="col-xl-8 col-sm-7">
                                <Input
                                  className="form-control"
                                  name="product_ratings"
                                  id="validationCustom02"
                                  type="number"
                                  value={rating}
                                  onChange={(e) =>
                                    handleRatingChange(i, e.target.value)
                                  }
                                  required
                                />
                              </div>
                              {i > 0 && (
                                <button
                                  onClick={() => handleRemoveRating(i)}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              )}
                            </FormGroup>
                          ))}
                          <button
                            onClick={handleAddRating}
                            type="button"
                            className="btn btn-primary"
                          >
                            Add Rating
                          </button>
                        </div>
                        {/* Product Reviews */}
                        <div>
                          {reviews.map((review, i) => (
                            <FormGroup className="form-group mb-3 row">
                              <Label className="col-xl-3 col-sm-4 mb-0">
                                Review {i + 1} :
                              </Label>
                              <div className="col-xl-8 col-sm-7">
                                <Input
                                  className="form-control"
                                  name="product_reviews"
                                  id="validationCustom02"
                                  type="text"
                                  value={review}
                                  onChange={(e) =>
                                    handleReviewChange(i, e.target.value)
                                  }
                                  required
                                />
                              </div>
                              {i > 0 && (
                                <button
                                  onClick={() => handleRemoveReview(i)}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              )}
                            </FormGroup>
                          ))}
                          <button
                            onClick={handleAddReview}
                            type="button"
                            className="btn btn-primary"
                          >
                            Add Review
                          </button>
                        </div>
                        {/* Product Variants */}
                        <div>
                          {variants.map((variant, i) => (
                            <FormGroup className="form-group mb-3 row">
                              <Label className="col-xl-3 col-sm-4 mb-0">
                                Variant {i + 1} :
                              </Label>
                              <div className="col-xl-8 col-sm-7">
                                <Row>
                                  <Col>
                                    <Input
                                      className="form-control"
                                      type="text"
                                      placeholder="Color"
																			value={variant.color}
																			onChange={e => handleVariantChange(i, 'color', e.target.value)}
                                      required
                                    />
                                  </Col>
                                  <Col>
                                    <Input
                                      className="form-control"
                                      type="text"
                                      placeholder="Code"
																			value={variant.code}
																			onChange={e => handleVariantChange(i, 'code', e.target.value)}
                                      required
                                    />
                                  </Col>
                                  <Col>
                                    <Input
                                      className="form-control"
                                      type="text"
                                      placeholder="ImageId"
																			value={variant.imgId}
																			onChange={e => handleVariantChange(i, 'imgId', e.target.value)}
                                      required
                                    />
                                  </Col>
                                  <Col>
                                    <Input
                                      className="form-control"
                                      type="number"
                                      placeholder="Size"
																			value={variant.size}
																			onChange={e => handleVariantChange(i, 'size', e.target.value)}
                                      required
                                    />
                                  </Col>
                                  <Col>
                                    <Input
                                      className="form-control"
                                      type="text"
                                      placeholder="Stock"
																			value={variant.stock}
																			onChange={e => handleVariantChange(i, 'stock', e.target.value)}
                                      required
                                    />
                                  </Col>
                                  <Col>
                                    <Input
                                      className="form-control"
                                      type="text"
                                      placeholder="Sku"
																			value={variant.sku}
																			onChange={e => handleVariantChange(i, 'sku', e.target.value)}
                                      required
                                    />
                                  </Col>
                                </Row>
                              </div>
                              {i > 0 && (
                                <button
                                  onClick={() => handleRemoveVariant(i)}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Remove
                                </button>
                              )}
                            </FormGroup>
                          ))}
                          <button
                            onClick={handleAddVariant}
                            type="button"
                            className="btn btn-primary"
                          >
                            Add Variant
                          </button>
                        </div>
                      </div>
                      <div className="form">
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4">
                            Add Description :
                          </Label>
                          <div className="col-xl-8 col-sm-7 description-sm">
                            <MDEditor value={value} onChange={onChange} />
                          </div>
                        </FormGroup>
                      </div>
                      <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                          Add
                        </Button>
                        <Button type="button" color="light">
                          Discard
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Add_product;
