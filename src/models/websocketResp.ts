export interface WebsocketResp {
  action: WebhookContext;
  sendDate: Date;
  data: any;
}

export const enum WebhookContext {
  LIVE = "LIVE",
  CHANGE_SONG = "CHANGE_SONG",
}
