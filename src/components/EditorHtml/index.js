
import React, { Component } from "react";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export class HtmlEditor extends Component {

    constructor({editorState, onChange, onClose, ...rest}) {
        super({editorState, onChange, onClose, ...rest})

        this.onChange = onChange
        this.onClose = onClose
        var html = this.getHtmlContent(editorState);

        this.state = {
            htmlContent: html
        }
    }

    componentWillReceiveProps = (props) => {
        const { editorState } = props

        var html = this.getHtmlContent(editorState);

        this.setState({
            htmlContent: html
        })
    }

    getHtmlContent = (editorState) => {
        var html = ''

        if(editorState){
            html = this.convertContentToHtml(editorState.getCurrentContent())
        }

        return html;
    }

    convertContentToHtml = (content) => {
        var rawContentState = convertToRaw(content);

        return draftToHtml(rawContentState)
    }

    changeHandler = (event) => {
        this.setState({
            htmlContent: event.target.value
        })
    }

    applyHtmlChanges = () => {
        const contentBlock = htmlToDraft(this.state.htmlContent);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const newEditorState = EditorState.createWithContent(contentState);

        this.onChange(newEditorState)
    }

    closeHtmlHandler = () => {
        this.onClose();
    }

    render() {
        return <div>
            <textarea 
                className="rdw-storybook-textarea"
                value={this.state.htmlContent}
                onChange={this.changeHandler}
            ></textarea>
            <button onClick={this.applyHtmlChanges}>Apply</button>
            <button onClick={this.closeHtmlHandler}>Finished</button>
        </div>
    }
}