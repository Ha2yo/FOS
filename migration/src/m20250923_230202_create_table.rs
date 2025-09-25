use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;


#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
    manager
        // CREATE TABLE IF NOT EXISTS 'Users'
        .create_table(
            Table::create()
                .table(Users::Table)
                .if_not_exists()
                // 'UserId' INT NOT NULL AUTO_INCREMENT PRIMARY KEY
                .col(
                    ColumnDef::new(Users::UserId)
                        .integer()
                        .not_null()
                        .auto_increment()
                        .primary_key(),
                )
                // 'UserName' VARCHAR(255) NOT NULL
                .col(
                    ColumnDef::new(Users::UserName).string().not_null()
                )
                // 'OauthId' VARCHAR(255)
                .col(
                    ColumnDef::new(Users::OauthId).string()
                )
                // 'DistanceWeight' INT
                .col(
                    ColumnDef::new(Users::DistanceWeight).integer()
                )
                // 'PriceWeight' INT
                .col(
                    ColumnDef::new(Users::PriceWeight).integer()
                )
                .to_owned(),
        )
        .await?;
    Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
    manager
        .drop_table(Table::drop().table(Users::Table).if_exists().to_owned())
        .await?;

    Ok(())
}
}

#[derive(Iden)]
enum Users{
    Table,
    UserId,
    UserName,
    OauthId,
    DistanceWeight,
    PriceWeight,
}