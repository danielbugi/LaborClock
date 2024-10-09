'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  useDisclosure,
} from '@nextui-org/react';

import { VerticalDotsIcon } from '@/components/vertical-dots-icon';
import { useEffect, useState } from 'react';
import { set } from 'mongoose';

function ActionButtons({ postData, session }) {
  // State management for Delete Modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [deleteSize, setDeleteSize] = useState('sm');

  // State management for Edit Modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [editSize, setEditSize] = useState('sm');

  // Form state for Edit Modal
  const [editData, setEditData] = useState({
    day: postData.day,
    isHoliday: postData.isHoliday,
    from: postData.from,
    to: postData.to,
    note: postData.note,
  });

  const handleDeleteOpen = (size) => {
    setDeleteSize(size);
    onDeleteOpen();
  };

  const handleEditOpen = (size) => {
    setEditSize(size);
    onEditOpen();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      isHoliday: e.target.checked,
    }));
  };

  useEffect(() => {
    if (session) {
      setEditData((prev) => ({
        ...prev,
        perHour: session.user.perHour,
        userId: session.user.userId,
      }));
    }
  }, [session]);

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/labor-day', {
        method: 'DELETE',
        body: JSON.stringify({ _id: postData._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.status === 'success') {
        console.log('Record deleted successfully');
        onDeleteClose();

        // Revalidate the data
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/labor-day', {
        method: 'PUT',
        body: JSON.stringify({ ...editData, _id: postData._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('editData::: ', editData);
      const data = await res.json();
      //   console.log(data);

      if (data.status === 'success') {
        console.log('Record updated successfully');
        onEditClose();

        // Revalidate the data
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center gap-2">
      <ul className="w-full sm:w-2/3 flex justify-between">
        <Button>View</Button>
        <Button onPress={() => handleEditOpen('md')}>Edit</Button>
        <Button onPress={() => handleDeleteOpen('md')}>Delete</Button>
      </ul>

      {/* Delete Modal */}
      <Modal size={deleteSize} isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Attention</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this record?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal size={editSize} isOpen={isEditOpen} onClose={onEditClose}>
        <ModalContent>
          <ModalHeader>Edit Record</ModalHeader>
          <ModalBody>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <Input
                isRequired
                label="Day"
                type="number"
                id="day"
                value={editData.day}
                onChange={handleInputChange}
              />
              <Input
                isRequired
                label="From"
                type="time"
                id="from"
                value={editData.from}
                onChange={handleInputChange}
              />
              <Input
                isRequired
                label="To"
                type="time"
                id="to"
                value={editData.to}
                onChange={handleInputChange}
              />
              <Checkbox
                isSelected={editData.isHoliday}
                onChange={handleCheckboxChange}
              >
                Is it a holiday?
              </Checkbox>
              <Input
                label="Note"
                id="note"
                value={editData.note}
                onChange={handleInputChange}
              />
              <Button type="submit" color="primary">
                Save
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ActionButtons;
