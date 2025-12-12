import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import {
  CreateSessionFormData,
  Question,
  CreateSessionResponse,
} from "../../types";
import {
  LuSparkles,
  LuBriefcase,
  LuClock,
  LuTags,
  LuFileText,
} from "react-icons/lu";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState<CreateSessionFormData>({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (key: keyof CreateSessionFormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Call AI API to generate questons
      const aiResponse = await axiosInstance.post<Question[]>(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // Should an array: [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post<CreateSessionResponse>(
        API_PATHS.SESSION.CREATE,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[90vw] md:w-[40vw] p-8 flex flex-col justify-center">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-2xl font-bold text-slate-900">
          Create New Session
        </h3>
      </div>
      <p className="text-sm text-slate-600 mb-6">
        Tell us about your target role and we'll generate personalized interview
        questions for you
      </p>

      <form onSubmit={handleCreateSession} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <LuBriefcase className="w-4 h-4 text-primary" />
            Target Role <span className="text-red-500">*</span>
          </label>

          <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            placeholder="(e.g., Frontend Developer, UI/UX Designer, Backend Developer, etc.)"
            type="text"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <LuClock className="w-4 h-4 text-secondary" />
            Years of Experience <span className="text-red-500">*</span>
          </label>

          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            placeholder="(e.g., 1 year, 3 years, 5+ years, etc.)"
            type="text"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <LuTags className="w-4 h-4 text-accent" />
            Topics to Focus On <span className="text-red-500">*</span>
          </label>

          <Input
            value={formData.topicsToFocus}
            onChange={({ target }) =>
              handleChange("topicsToFocus", target.value)
            }
            placeholder="(e.g., React, Node.js, MongoDB, etc.)"
            type="text"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <LuFileText className="w-4 h-4 text-slate-500" />
            Description{" "}
            <span className="text-slate-400 text-xs">(Optional)</span>
          </label>
          <Input
            value={formData.description}
            onChange={({ target }) => handleChange("description", target.value)}
            placeholder="Any specific goals or notes for this session"
            type="text"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <SpinnerLoader /> Generating Questions...
            </>
          ) : (
            <>
              <p>Generate Interview Session</p>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
