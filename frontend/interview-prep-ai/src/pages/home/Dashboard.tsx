import { useEffect, useState } from "react";
import { LuPlus, LuSparkles } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import { toast } from "react-hot-toast";
import moment from "moment";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import { Session } from "../../types";

interface DeleteAlertState {
  open: boolean;
  data: Session | null;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get<Session[]>(
        API_PATHS.SESSION.GET_ALL
      );
      setSessions(response.data);
    } catch (error) {
      toast.error("Failed to fetch sessions. Please try again.");
    }
  };

  const deleteSession = async (sessionData: Session | null) => {
    if (!sessionData) return;
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData!._id));
      toast.success("Session deleted successfully!");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Failed to delete session. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data.role}
              topicsToFocus={data.topicsToFocus}
              experience={data.experience}
              questions={data.questions.length}
              description={data.description}
              lastUpdated={
                data.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Floating Add button */}
        {sessions.length > 0 && (
          <button
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-white px-6 py-3.5 rounded-full hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.05] transition-all duration-200 cursor-pointer fixed bottom-8 right-8 z-20 "
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-xl" />
            New Session
          </button>
        )}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <div className="">
          <DeleteAlertContent
            content="Are you sure you want to delete this session details? This action cannot be undone."
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
