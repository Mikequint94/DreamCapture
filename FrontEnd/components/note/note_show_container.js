import NoteShow from './note_show';

import {connect} from 'react-redux';

import {createNote} from '../../actions/note_actions';

const mapStateToProps = state => ({
  dreams: state.entities.dreams
});

const mapDispatchToProps = dispatch => ({
  createNote: note => dispatch(createNote(note))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteShow);
