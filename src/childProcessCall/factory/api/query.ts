/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/childProcessCall/factory/api/query.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { reply } from "../../Reply";
import { session } from "../../session";
import { ApiBase } from "../baseApi";

import { chain } from "../../actionChain/chain";

class QueryApi extends ApiBase {
  constructor() {
    super();
  }
  callArg(argv) {
    let argv_config = this.api_argv()
      .option("T", {
        alias: "dontTranslate",
        type: "boolean",
        default: false,
        describe: "Set to true to disable endpoint's translation",
      })
      .option("a", {
        alias: "getTodayQuestion",
        type: "boolean",
        default: false,
        describe: "getTodayQuestion",
      })
      .option("b", {
        alias: "username",
        type: "string",
        default: "",
        describe: "user name",
      })
      .option("c", {
        alias: "getRating",
        type: "boolean",
        default: false,
        describe: "ranking",
      })
      .option("z", {
        alias: "test",
        type: "string",
        default: "",
        describe: "test",
      });
    argv_config.parseArgFromCmd(argv);
    return argv_config.get_result();
  }

  call(argv) {
    session.argv = argv;
    if (argv.a) {
      chain.getChainHead().getTodayQuestion(function (e, result) {
        if (e) return;
        reply.info(JSON.stringify(result));
      });
    } else if (argv.b) {
      chain.getChainHead().getUserContest(argv.b, function (e, result) {
        if (e) return;
        reply.info(JSON.stringify(result));
      });
    } else if (argv.c) {
      chain.getChainHead().getRating(function (e, result) {
        if (e) {
          let log_data = {
            code: 101,
            data: {},
          };
          reply.info(JSON.stringify(log_data));
          return;
        }
        let log_data = {
          code: 100,
          data: result,
        };
        reply.info(JSON.stringify(log_data));
      });
    } else if (argv.z) {
      chain.getChainHead().getQueryZ(argv.z, function (e, result) {
        if (e) return;
        reply.info(JSON.stringify(result));
      });
    }
  }
}

export const queryApi: QueryApi = new QueryApi();