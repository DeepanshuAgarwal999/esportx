import axiosInstance from "@/config/axios.config";

export class TournamentService {

  static async createTeam() {
    const response = await axiosInstance.post("/createTeam");
    return response.data;
  }

  static async joinTeam(teamId: string) {
    const response = await axiosInstance.post(`/joinTeam`, {
      team_id: teamId,
    });
    return response.data;
  }
  
  static async teamTypes() {
    const response = await axiosInstance.post(`/teamTypes`);
    return response.data;
  }

  static async matchTypes(teamTypeId: string) {
    const response = await axiosInstance.post(`/matchTypes`, {
      team_type_id: teamTypeId,
    });
    return response.data;
  }

  static async prices(matchTypeId: string) {
    const response = await axiosInstance.post(`/prices`, {
      team_type_id: matchTypeId,
    });
    return response.data;
  }

  static async getMaps() {
    const response = await axiosInstance.get(`/maps`);
    return response.data;
  }
}
