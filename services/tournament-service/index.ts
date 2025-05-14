import axiosInstance from "@/config/axios.config";

export class TournamentService {
  static async createTeam(userId: number) {
    const response = await axiosInstance.post("/createTeam", {
      user_id: userId,
    });
    return response.data;
  }

  static async joinTeam(userId: number, team_code: string) {
    const response = await axiosInstance.post(`/joinTeam`, {
      user_id: userId,
      team_code: team_code,
    });
    return response.data;
  }

  static async teamTypes() {
    const response = await axiosInstance.post(`/teamTypes`);
    return response.data;
  }

  static async matchTypes(teamTypeId: number) {
    const response = await axiosInstance.post(`/matchTypes`, {
      team_type_id: teamTypeId,
    });
    return response.data;
  }

  static async prices(matchTypeId: number) {
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
