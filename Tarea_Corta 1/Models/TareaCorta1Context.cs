using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Tarea_Corta_1.Models
{
    //Para hacer la conexion a la base de datos en el Nuget Console
    //Scaffold-DBContext "Server=localhost; Database=TareaCorta1; Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

    //Para hacer update a la base de datos, cuando se cambia una opcion en Sql
    //Scaffold-DbContext -Connection "Server=localhost; Database=TareaCorta1; Trusted_Connection=True;" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -context TareaCorta1Context -Project Tarea_Corta1 -force

    public partial class TareaCorta1Context : DbContext
    {
        public TareaCorta1Context()
        {
        }

        public TareaCorta1Context(DbContextOptions<TareaCorta1Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Producers> Producers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=LocalHost; Database=TareaCorta1; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("customers");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(50);

                entity.Property(e => e.BirthDate)
                    .HasColumnName("birth_date")
                    .HasMaxLength(50);

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("user_name")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Producers>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("producers");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Product)
                    .IsRequired()
                    .HasColumnName("product")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Stock).HasColumnName("stock");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
