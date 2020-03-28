import cx from 'classnames';
import React from 'react';

class TextEditable extends React.Component {
  componentDidMount() {
    this.node.addEventListener('paste', event => this.handlePaste(event));
  }

  componentWillUnmount() {
    this.node.removeEventListener('paste', this.handlePaste);
  }

  handleChange = () => {
    let {
      placeholder,
      identifier,
      onChange,
      trimAll,
      trimBreaks,
      trimCommas,
      trimSpaces,   
    } = this.props;
    let text = this.node.innerHTML;

    if (text === placeholder) {
      return;
    }

    if (trimAll === true) {
      trimBreaks = true;
      trimCommas = true;
      trimSpaces = true;
    }

    // Remove characters that are explicitly not allowed
    trimBreaks && (text = text.replace(/\n|\r|<br>/g, ''));
    trimCommas && (text = text.replace(/,/g, ''));
    trimSpaces && (text = text.replace(/\s/g, ''));

    if (text) {
      if (onChange) {
        onChange(text, identifier);
      }
    }
    else {
      // The user cleared the text and focus blurred.  Reset
      // the text to something useful.
      this.node.innerHTML = this.props.text || placeholder;
    }
  }

  handleClick = (event: Object) => {
    this.handleFocus(event);
    event.stopPropagation();
  }

  handleFocus = (event: Object) => {
    let node = event.target;
    node.spellcheck = false;

    // Browser allows us to make a selection, so we select the div’s contents
    if (window.getSelection && document.createRange) {  
      let range = document.createRange();
      range.selectNodeContents(node);
      let selection = window.getSelection();

      // Do not create a new selection if the node is already focused,
      // and this text is already selected
      if (document.activeElement === node && range.toString() === selection.toString()) {
        return;
      }
      // Only create a selection if the user hasn't explicitly just dragged to create one
      if (selection.toString() === '') {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  handleKeyPress = (event: Object) => {
    if (event.key === 'Enter' || event.key === 'Return') {
      event.preventDefault();
      this.handleChange();
    }
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  }

  handlePaste = (event: Object) => {
    event.preventDefault();
    let plainTextContent = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, plainTextContent);
  }

  render () {
    let {
      style,
      className,
      placeholder,
      showBorder,
      text,
    } = this.props;

    let textToShow = !text ? placeholder : text;

    let border = {};
    if (showBorder) {
      border = {
        border: '1px solid #ededed',
        padding: '5px',
      };
    }
    
    return (
      <span
        ref={(node) => {this.node = node}}
        style={{
          ...style,
          ...border,
          opacity: !text && placeholder && .5,
        }}
        className={cx('text-editable', className)}
        contentEditable="true"
        onBlur={this.handleChange}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onKeyPress={this.handleKeyPress}
        dangerouslySetInnerHTML={{__html: textToShow}}>
      </span>
    );
  }
}

TextEditable.defaultProps = {
  identifier: null,
  onKeyPress: null,
  placeholder: 'Edit',
  showBorder: false,
  trimAll: false,
  trimBreaks: true,
  trimCommas: false,
  trimSpaces: false,
};

export default TextEditable;
