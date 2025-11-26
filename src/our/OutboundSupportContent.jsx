import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import {
  Plus,
  MessageSquare,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export function OutboundSupportContent() {
  const { token } = useAuthStore();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Fetch all tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ticket`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();
      if (data.success) {
        setTickets(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to load tickets", {
        description: error.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTickets();
    }
  }, [token]);

  // Create a new ticket
  const handleCreateTicket = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Validation Error", {
        description: "Title and description are required",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ticket`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title.trim(),
            description: formData.description.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create ticket");
      }

      if (data.success) {
        toast.success("Ticket created successfully!", {
          description: "Your support ticket has been submitted",
        });
        setIsCreateDialogOpen(false);
        setFormData({ title: "", description: "" });
        fetchTickets(); // Refresh the list
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create ticket", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch single ticket details
  const fetchTicketDetails = async (ticketId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ticket details");
      }

      const data = await response.json();
      if (data.success) {
        setSelectedTicket(data.data);
        setIsDetailDialogOpen(true);
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      toast.error("Failed to load ticket details", {
        description: error.message || "Please try again later",
      });
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        icon: AlertCircle,
        color: "bg-yellow-500",
        text: "Open",
        textColor: "text-yellow-900",
      },
      in_progress: {
        icon: Clock,
        color: "bg-blue-500",
        text: "In Progress",
        textColor: "text-blue-900",
      },
      resolved: {
        icon: CheckCircle2,
        color: "bg-green-500",
        text: "Resolved",
        textColor: "text-green-900",
      },
      closed: {
        icon: XCircle,
        color: "bg-gray-500",
        text: "Closed",
        textColor: "text-gray-900",
      },
    };

    const config = statusConfig[status] || statusConfig.open;
    const Icon = config.icon;

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${config.color}`}
      >
        <Icon className={`w-3.5 h-3.5 ${config.textColor}`} />
        <span className={`text-xs font-black uppercase ${config.textColor}`}>
          {config.text}
        </span>
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            Outbound Support
          </h2>
          <p className="text-sm text-black/60 mt-1">
            Create and manage your support tickets
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[#828BF8] hover:bg-[#828BF8]/80 text-white font-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase">
                Create Support Ticket
              </DialogTitle>
              <DialogDescription>
                Describe your issue and we'll get back to you as soon as possible
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-black uppercase">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Brief description of your issue"
                  className="border-[2px] border-black"
                  required
                  maxLength={200}
                />
                <p className="text-xs text-black/60">
                  {formData.title.length}/200 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-black uppercase"
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Provide detailed information about your issue..."
                  className="border-[2px] border-black min-h-[150px]"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-[2px] border-black"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#828BF8] hover:bg-[#828BF8]/80 text-white font-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#828BF8]" />
        </div>
      ) : tickets.length === 0 ? (
        <Card className="p-12 text-center border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-black/40" />
          <h3 className="text-xl font-black text-black mb-2">
            No Tickets Yet
          </h3>
          <p className="text-sm text-black/60 mb-6">
            Create your first support ticket to get started
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#828BF8] hover:bg-[#828BF8]/80 text-white font-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <Card
              key={ticket._id}
              className="p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 bg-white cursor-pointer"
              onClick={() => fetchTicketDetails(ticket._id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-black text-black truncate">
                      {ticket.title}
                    </h3>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <p className="text-sm text-black/70 line-clamp-2 mb-3">
                    {ticket.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-black/60">
                    <span>Created: {formatDate(ticket.createdAt)}</span>
                    {ticket.updatedAt !== ticket.createdAt && (
                      <span>Updated: {formatDate(ticket.updatedAt)}</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 border-[2px] border-black hover:bg-[#FEF18C]"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchTicketDetails(ticket._id);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Ticket Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent 
          showCloseButton={false}
          className="bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-black uppercase">
                    Ticket Details
                  </DialogTitle>
                  {getStatusBadge(selectedTicket.status)}
                </div>
                <DialogDescription>
                  Created: {formatDate(selectedTicket.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div>
                  <Label className="text-sm font-black uppercase text-black/60">
                    Title
                  </Label>
                  <p className="text-lg font-bold text-black mt-1">
                    {selectedTicket.title}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-black uppercase text-black/60">
                    Description
                  </Label>
                  <p className="text-sm text-black mt-1 whitespace-pre-wrap">
                    {selectedTicket.description}
                  </p>
                </div>
                {selectedTicket.solution_description && (
                  <div>
                    <Label className="text-sm font-black uppercase text-black/60">
                      Solution
                    </Label>
                    <div className="mt-1 p-4 bg-[#AAD6B8]/20 border-[2px] border-black rounded-sm">
                      <p className="text-sm text-black whitespace-pre-wrap">
                        {selectedTicket.solution_description}
                      </p>
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t-[2px] border-black">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-black text-black/60">Status:</span>
                      <span className="ml-2 font-bold text-black">
                        {selectedTicket.status
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                    </div>
                    <div>
                      <span className="font-black text-black/60">
                        Last Updated:
                      </span>
                      <span className="ml-2 font-bold text-black">
                        {formatDate(selectedTicket.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

