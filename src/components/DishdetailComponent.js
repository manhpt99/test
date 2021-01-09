import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

function RenderDish({dish}) {
    if (dish != null)
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
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

function RenderComments({comments})  {
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
            </div>
        );
    else
        return (
            <div></div>
        );
}

    const DishDetail = (props) => {
        if (props.dish != null)
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
                            <RenderComments comments={props.comments} />
                        </div> : null}
                    </div>
                </div>
            );
        else
            return (
                <div class="container"></div>
            )
    };


export default DishDetail
