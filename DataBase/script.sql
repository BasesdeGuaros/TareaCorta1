USE [master]
GO
/****** Object:  Database [TareaCorta1]    Script Date: 10/9/2020 6:01:39 PM ******/
CREATE DATABASE [TareaCorta1]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TareaCorta1', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TareaCorta1.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TareaCorta1_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TareaCorta1_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [TareaCorta1] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TareaCorta1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TareaCorta1] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TareaCorta1] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TareaCorta1] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TareaCorta1] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TareaCorta1] SET ARITHABORT OFF 
GO
ALTER DATABASE [TareaCorta1] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TareaCorta1] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TareaCorta1] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TareaCorta1] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TareaCorta1] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TareaCorta1] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TareaCorta1] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TareaCorta1] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TareaCorta1] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TareaCorta1] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TareaCorta1] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TareaCorta1] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TareaCorta1] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TareaCorta1] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TareaCorta1] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TareaCorta1] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TareaCorta1] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TareaCorta1] SET RECOVERY FULL 
GO
ALTER DATABASE [TareaCorta1] SET  MULTI_USER 
GO
ALTER DATABASE [TareaCorta1] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TareaCorta1] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TareaCorta1] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TareaCorta1] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TareaCorta1] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TareaCorta1', N'ON'
GO
ALTER DATABASE [TareaCorta1] SET QUERY_STORE = OFF
GO
USE [TareaCorta1]
GO
/****** Object:  Table [dbo].[category]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_category] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_customer] [int] NOT NULL,
	[subtotal] [int] NOT NULL,
	[tax] [float] NOT NULL,
	[total] [float] NOT NULL,
 CONSTRAINT [PK_order] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_products]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_products](
	[id_order] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[id_product] [int] NOT NULL,
	[total] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producers]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producers](
	[id] [int] NOT NULL,
	[sinpe] [int] NOT NULL,
	[isAccepted] [int] NOT NULL,
	[id_producer] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_producers] PRIMARY KEY CLUSTERED 
(
	[id_producer] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[product] [varchar](50) NOT NULL,
	[sale_mode] [varchar](50) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category_id] [int] NOT NULL,
 CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[productsProducer]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productsProducer](
	[quantity] [int] NULL,
	[id_product] [int] NOT NULL,
	[id_producer] [int] NOT NULL,
	[price] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 10/9/2020 6:01:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id_user] [int] NOT NULL,
	[password] [varchar](50) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[address] [varchar](50) NOT NULL,
	[phone_number] [int] NOT NULL,
	[birth_date] [varchar](50) NOT NULL,
	[rol] [varchar](50) NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_order_user] FOREIGN KEY([id_customer])
REFERENCES [dbo].[user] ([id_user])
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_order_user]
GO
ALTER TABLE [dbo].[order_products]  WITH CHECK ADD  CONSTRAINT [FK_order_products_order] FOREIGN KEY([id_order])
REFERENCES [dbo].[order] ([id])
GO
ALTER TABLE [dbo].[order_products] CHECK CONSTRAINT [FK_order_products_order]
GO
ALTER TABLE [dbo].[order_products]  WITH CHECK ADD  CONSTRAINT [FK_order_products_products] FOREIGN KEY([id_product])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[order_products] CHECK CONSTRAINT [FK_order_products_products]
GO
ALTER TABLE [dbo].[producers]  WITH CHECK ADD  CONSTRAINT [FK_producers_user] FOREIGN KEY([id])
REFERENCES [dbo].[user] ([id_user])
GO
ALTER TABLE [dbo].[producers] CHECK CONSTRAINT [FK_producers_user]
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD  CONSTRAINT [FK_products_category] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([id])
GO
ALTER TABLE [dbo].[products] CHECK CONSTRAINT [FK_products_category]
GO
ALTER TABLE [dbo].[productsProducer]  WITH CHECK ADD  CONSTRAINT [FK_productsProducer_producers] FOREIGN KEY([id_producer])
REFERENCES [dbo].[producers] ([id_producer])
GO
ALTER TABLE [dbo].[productsProducer] CHECK CONSTRAINT [FK_productsProducer_producers]
GO
ALTER TABLE [dbo].[productsProducer]  WITH CHECK ADD  CONSTRAINT [FK_stock_products] FOREIGN KEY([id_product])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[productsProducer] CHECK CONSTRAINT [FK_stock_products]
GO
USE [master]
GO
ALTER DATABASE [TareaCorta1] SET  READ_WRITE 
GO
