import { createClient } from "db-vendo-client";
import { profile as dbnavProfile } from "db-vendo-client/p/dbnav/index.js";

const userAgent = "alexander.ley.inbox@gmail.com";
const client = createClient(dbnavProfile, userAgent);
export default client;
