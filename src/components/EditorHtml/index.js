
import React, { Component } from "react";

export class HtmlEditor extends Component {

    constructor({htmlEditorContent, onChange, ...rest}) {
        super({htmlEditorContent, onChange, ...rest})

        this.onChange = onChange

        this.state = {
            htmlContent: htmlEditorContent
        }
    }

    componentWillReceiveProps = (props) => {
        const { htmlEditorContent } = props
        this.setState({
            htmlContent: htmlEditorContent
        })
    }

    changeHandler = (event) => {
        this.onChange(event.target.value)
    }

    render() {
        return <div>
            <textarea 
                className="rdw-storybook-textarea"
                value={this.state.htmlContent}
                onChange={(event) => this.changeHandler(event)}
            ></textarea>
        </div>
    }
}