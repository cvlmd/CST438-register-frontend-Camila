import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants'; // Assurez-vous d'importer correctement SERVER_URL

function AddAssignment(props) {
  const [open, setOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    assignmentName: '',
    courseTitle: '',
    dueDate: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  const handleAdd = () => {
    // Appel de la fonction addAssignment avec les données d'assignation
    props.addAssignment(assignmentData);
    handleClose();
  };

  // Fonction pour ajouter une assignation
  const addAssignmentToServer = () => {
    fetch(`${SERVER_URL}/assignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData), // Utilisez les données d'assignation actuelles
    })
      .then((response) => {
        if (response.ok) {
          // L'assignation a été ajoutée avec succès, vous pouvez rafraîchir la liste des assignations.
          // Vous pouvez appeler fetchAssignments() ici pour mettre à jour la liste.
          console.log('Assignment added successfully');
        } else {
          // Gérez le cas où l'ajout d'assignation a échoué.
          console.error('Failed to add assignment.');
        }
      })
      .catch((error) => {
        console.error('Error adding assignment:', error);
      });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
        Add Assignment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField autoFocus fullWidth label="Assignment Name" name="assignmentName" onChange={handleChange} />
          <TextField fullWidth label="Course Title" name="courseTitle" onChange={handleChange} />
          <TextField type="date" fullWidth label="Due Date" name="dueDate" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => { handleAdd(); addAssignmentToServer(); }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// Mettez à jour les propTypes pour refléter les nouvelles exigences
AddAssignment.propTypes = {
  addAssignment: PropTypes.func.isRequired,
};

export default AddAssignment;
$
