import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import mailConfig from "./mail.config";

@Module({
  imports: [ConfigModule.forFeature(mailConfig)],
  exports: [ConfigModule],
})
export class MailConfigModule {}
