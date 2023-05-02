class ServerResponse {
  constructor(message, details = null, status = true) {
    this.message = message || "Server response";
    this.details = details;
    this.status = status;
  }
}

module.exports = {
  ServerResponse,
};
