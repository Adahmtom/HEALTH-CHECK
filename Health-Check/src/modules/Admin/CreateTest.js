import React, { useState } from "react";
import Layout from "../../layout";
import styles from "./styles.module.css";
import { useIsMutating } from "@tanstack/react-query";
import { useAddTest, useGetChecklist, useGetSample } from "./hooks";
import { errorAlert, infoAlert } from "../../utils";
import { useNavigate } from "react-router-dom";

const TestCreator = () => {
  const [testName, setTestName] = useState("");
  const [testPrice, setTestPrice] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [testSample, setTestSample] = useState([]);
  const [showSampleList, setShowSampleList] = useState(false);
  const [showChecklistList, setShowChecklistList] = useState(false);
  const isLoading = useIsMutating();
  const { data: checkListSample } = useGetChecklist();
  const { data: arraySample } = useGetSample();
  const navigate = useNavigate();

  const {
    mutate: addSample,
    isError: addError,
    isSuccess: isSuccessAdd,
    reset: resetAdd,
    error: errorAdd,
  } = useAddTest();

  const handleAddSample = (sampleName, sampleId) => {
    if (!Array.isArray(testSample)) {
      setTestSample([]);
    }

    // Check if a sample with the same ID already exists
    const exists = testSample.some((sample) => sample._id === sampleId);

    if (!exists) {
      const newSampleItem = { name: sampleName, _id: sampleId };
      setTestSample([...testSample, newSampleItem]);
    } else {
      infoAlert(`Sample ${sampleName} already added.`);
    }
  };

  const handleAddChecklist = (checkListName, checkListId) => {
    if (!Array.isArray(checklist)) {
      setChecklist([]);
    }
  
    let exists = false;
    for (const item of checklist) {
      if (item._id === checkListId) {
        exists = true;
        break;
      }
    }
  
    if (!exists) {
      const newcheckListItem = { name: checkListName, _id: checkListId };
      setChecklist([...checklist, newcheckListItem]);
    } else {
      infoAlert(`Checklist ${checkListName} already added.`);
    }
  };

  const removeSample = (sampleId) => {
    // Filter out the sample with the specified ID
    const updatedSamples = testSample.filter(
      (sample) => sample._id !== sampleId
    );
    setTestSample(updatedSamples);
  };

  const removeChecklist = (ChecklistId) => {
    // Filter out the Checklist with the specified ID
    const updatedChecklists = checklist.filter(
      (CheckList) => CheckList._id !== ChecklistId
    );
    setChecklist(updatedChecklists);
  };

  const toggleSampleList = () => {
    setShowSampleList(!showSampleList);
  };

  const toggleChecklistList = () => {
    setShowChecklistList(!showChecklistList);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const sampleIds = testSample.map((sample) => sample._id);
    const checkListIds = checklist.map((checklist) => checklist._id);

    const formData = {
      name: testName,
      amount: testPrice,
      sample: sampleIds,
      checkList: checkListIds,
    };

    addSample(formData);
  };

  if (addError) {
    resetAdd();
    errorAlert(errorAdd);
  }
  
  if (isSuccessAdd) {
    setTestName("");
    setTestPrice("");
    setChecklist([]);
    setTestSample([]);
    resetAdd();
    navigate("/app/admin/settings/test");
  }

  return (
    <Layout name="Settings" title="Test">
      <div className={styles.testCreatorContainer}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.buttonContainer}>
            {checkListSample?.length > 0 && (
              <button
                onClick={toggleChecklistList}
                className={styles.showSampleButton}
              >
                Checklists
              </button>
            )}
            {arraySample?.length > 0 && (
              <button
                onClick={toggleSampleList}
                className={styles.showSampleButton}
              >
                Samples
              </button>
            )}
          </div>
          {showSampleList && (
            <div className={styles.sampleList}>
              <p style={{ fontWeight: "bold" }}>Sample</p>
              {arraySample.map((item) => (
                <button
                  className={styles.sampleButton}
                  key={item._id}
                  onClick={() => handleAddSample(item.name, item._id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}

          {showChecklistList && (
            <div className={styles.sampleList}>
              <p style={{ fontWeight: "bold" }}>Checklist</p>
              {checkListSample.map((item) => (
                <button
                  className={styles.sampleButton}
                  key={item._id}
                  onClick={() => handleAddChecklist(item.name, item._id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <h1>Create Test</h1>
          <div className={styles.inputContainer}>
            <label>Test Name :</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Test Price :</label>
            <input
              type="number"
              value={testPrice}
              onChange={(e) => setTestPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Sample :</label>
            <div className={styles.sampleButtons}>
              {testSample.map((sample) => (
                <button
                  key={sample._id}
                  onClick={() => removeSample(sample._id)}
                >
                  {sample.name}{" "}
                  <span role="img" aria-label="Remove">
                    ❌
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>Checklist :</label>
            <div className={styles.sampleButtons}>
              {checklist.map((sample) => (
                <button
                  key={sample._id}
                  onClick={() => removeChecklist(sample._id)}
                >
                  {sample.name}{" "}
                  <span role="img" aria-label="Remove">
                    ❌
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={submitHandler}
            type="submit"
            disabled={isLoading ? true : false}
            className={`btn btn-primary ${styles["btn-primary"]}`}
          >
            {isLoading ? "loading" : "Save"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TestCreator;
