-- Check if table exists before creating
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[users] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [username] NVARCHAR(50) NOT NULL UNIQUE,
        [email] NVARCHAR(100) NOT NULL UNIQUE,
        [password_hash] NVARCHAR(255) NOT NULL,
        [created_at] DATETIME2 DEFAULT GETUTCDATE(),
        [updated_at] DATETIME2 DEFAULT GETUTCDATE()
    );
END