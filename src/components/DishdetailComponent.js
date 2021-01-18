import React, {Component} from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col
} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import moment from 'moment';

import { Loading } from './LoadingComponent';

function RenderDish({dish}) {
    if (dish != null)
        return (
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return (
            <div></div>
        );
}

function RenderComments({comments, addComment, dishId})  {
    if (comments != null)
        return (
            <div >
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map(comment =>
                        <div >
                            <li>
                                {comment.comment}
                            </li>
                            <li>
                                -- {comment.author} ,
                                    {moment(comment.date).add(1, 'd').format(' MMM DD, YYYY')}
                            </li>
                            <br></br>
                        </div>
                    )}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    else
        return (
            <div></div>
        );
}

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        {props.comments != null ? <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}
                            />
                        </div> : null}  
                    </div>
                </div>
            );
        else
            return (
                <div class="container"></div>
            )
    };


class CommentForm extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false
            };
              this.toggleModal = this.toggleModal.bind(this);
              this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }
    
        render() {
    
            const required = (val) => val && val.length;
            const maxLength = (len) => (val) => !(val) || (val.length <= len);
            const minLength = (len) => (val) => val && (val.length >= len);
    
            return (
                <div>
                   <Button outline onClick={this.toggleModal}>
                       <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
    
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" className="ml-3">Rating</Label>
                                    <Col md={12}> 
                                        <Control.text type="number" min="1" max="5" defaultValue="1" model=".rating" id="rating" name="rating"
                                        className="form-control"
                                            />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name" className="ml-3">Your name</Label>
                                    <Col md={12}>
                                        <Control.text  model=".name" id="name" name="name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: '*Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" className="ml-3">Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea  model=".comment" id="comment" name="comment"
                                            rows="5"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
    
                </div>
            )
        }
    }

export default DishDetail
