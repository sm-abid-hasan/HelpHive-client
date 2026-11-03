"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/common/FormField";
import { EVENT_TYPES } from "@/lib/constants";
import { validateEvent } from "@/lib/validators";

const emptyValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};


export default function EventForm({ initialValues = emptyValues, minDate, onSubmit, submitLabel, loading }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validateEvent(values, minDate);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }
    onSubmit(values);
  };

  const inputClass = (name) => `input w-full ${errors[name] ? "input-error" : ""}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-md sm:p-8" noValidate>
      <FormField label="Event title" error={errors.title}>
        <input name="title" value={values.title} onChange={handleChange} placeholder="e.g. Winter Clothes Distribution" className={inputClass("title")} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Event type" error={errors.eventType}>
          <select name="eventType" value={values.eventType} onChange={handleChange} className={`select w-full ${errors.eventType ? "select-error" : ""}`}>
            <option value="" disabled>Choose a type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Event date" error={errors.eventDate}>
          <input type="date" name="eventDate" min={minDate} value={values.eventDate} onChange={handleChange} className={inputClass("eventDate")} />
        </FormField>
      </div>

      <FormField label="Location" error={errors.location}>
        <input name="location" value={values.location} onChange={handleChange} placeholder="e.g. Mirpur 10, Dhaka" className={inputClass("location")} />
      </FormField>

      <FormField label="Thumbnail image URL" error={errors.thumbnail}>
        <input type="url" name="thumbnail" value={values.thumbnail} onChange={handleChange} placeholder="https://example.com/event-photo.jpg" className={inputClass("thumbnail")} />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={5}
          placeholder="Tell volunteers what will happen, what to bring and where to meet."
          className={`textarea w-full ${errors.description ? "textarea-error" : ""}`}
        />
      </FormField>

      <button type="submit" disabled={loading} className="btn btn-primary w-full sm:w-auto">
        {loading ? <span className="loading loading-spinner loading-sm"></span> : submitLabel}
      </button>
    </form>
  );
}
