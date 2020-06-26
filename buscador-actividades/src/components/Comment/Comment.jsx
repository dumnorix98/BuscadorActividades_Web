import React, { Component } from 'react'

import "./Comment.css";

export default class Comment extends Component {
    render() {
        return (
            <div className="media">
                <img className="d-flex rounded-circle avatar z-depth-1-half mr-3" src={"http://localhost:3000/img/" + this.props.Image}
                    alt={this.props.UserName} />
                <div className="media-body">
                    <h5 className="mt-0 font-weight-bold blue-text">{this.props.UserName}</h5>
                    {this.props.Text}
                </div>
            </div>
        )
    }
}