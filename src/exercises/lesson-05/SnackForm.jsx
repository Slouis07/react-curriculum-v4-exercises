import { useState, useEffect } from 'react';
import styles from './SnackForm.module.css';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);

  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    rating: false,
  });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(String(editingSnack.rating));
    } else {
      setName('');
      setRating('');
    }

    setTouched({
      name: false,
      rating: false,
    });
  }, [editingSnack]);

  function validateName() {
    return name.trim() !== '';
  }

  function validateRating() {
    const numericRating = Number(rating);

    return (
      rating !== '' &&
      Number.isInteger(numericRating) &&
      numericRating >= 1 &&
      numericRating <= 5
    );
  }

  function getNameError() {
    if (touched.name && !validateName()) {
      return 'Snack name is required';
    }

    return '';
  }

  function getRatingError() {
    if (!touched.rating) return '';

    if (rating === '') {
      return 'Please select a rating';
    }

    if (!validateRating()) {
      return 'Rating must be between 1 and 5';
    }

    return '';
  }

  const nameError = getNameError();
  const ratingError = getRatingError();

  function handleSubmit(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isRatingValid = validateRating();

    if (!isNameValid || !isRatingValid) {
      setTouched({
        name: true,
        rating: true,
      });
      return;
    }

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name, rating);

      setName('');
      setRating('');
      setTouched({
        name: false,
        rating: false,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label htmlFor="snack-name" className={styles['field-label']}>
          Name:
        </label>

        <input
          id="snack-name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={`${styles['field-input']} ${
            nameError
              ? styles['input-error']
              : touched.name && validateName()
                ? styles['input-valid']
                : ''
          }`}
          placeholder="Enter snack name"
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? 'snack-name-error' : undefined}
        />

        {nameError && (
          <div id="snack-name-error" className={styles.error}>
            {nameError}
          </div>
        )}
      </div>

      <div className={styles['field-container']}>
        <label htmlFor="snack-rating" className={styles['field-label']}>
          Rating:
        </label>

        <input
          id="snack-rating"
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          min="1"
          max="5"
          step="1"
          className={`${styles['field-input']} ${
            ratingError
              ? styles['input-error']
              : touched.rating && validateRating()
                ? styles['input-valid']
                : ''
          }`}
          placeholder="Rate 1-5"
          aria-invalid={Boolean(ratingError)}
          aria-describedby={ratingError ? 'snack-rating-error' : undefined}
        />

        {ratingError && (
          <div id="snack-rating-error" className={styles.error}>
            {ratingError}
          </div>
        )}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
