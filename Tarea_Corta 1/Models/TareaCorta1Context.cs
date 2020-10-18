using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Tarea_Corta_1.Models
{
    public partial class TareaCorta1Context : DbContext
    {
        public TareaCorta1Context()
        {
        }

        public TareaCorta1Context(DbContextOptions<TareaCorta1Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderProducts> OrderProducts { get; set; }
        public virtual DbSet<Producers> Producers { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<ProductsProducer> ProductsProducer { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost; Database=TareaCorta1; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("order");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdCustomer).HasColumnName("id_customer");

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.Subtotal).HasColumnName("subtotal");

                entity.Property(e => e.Tax).HasColumnName("tax");

                entity.Property(e => e.Total).HasColumnName("total");

                entity.HasOne(d => d.IdCustomerNavigation)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.IdCustomer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_order_user");
            });

            modelBuilder.Entity<OrderProducts>(entity =>
            {
                entity.ToTable("order_products");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdOrder).HasColumnName("id_order");

                entity.Property(e => e.IdProduct).HasColumnName("id_product");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Total).HasColumnName("total");

                entity.HasOne(d => d.IdOrderNavigation)
                    .WithMany(p => p.OrderProducts)
                    .HasForeignKey(d => d.IdOrder)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_order_products_order");

                entity.HasOne(d => d.IdProductNavigation)
                    .WithMany(p => p.OrderProducts)
                    .HasForeignKey(d => d.IdProduct)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_order_products_products");
            });

            modelBuilder.Entity<Producers>(entity =>
            {
                entity.HasKey(e => e.IdProducer);

                entity.ToTable("producers");

                entity.Property(e => e.IdProducer).HasColumnName("id_producer");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsAccepted).HasColumnName("isAccepted");

                entity.Property(e => e.Sinpe).HasColumnName("sinpe");

                entity.HasOne(d => d.IdNavigation)
                    .WithMany(p => p.Producers)
                    .HasForeignKey(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_producers_user");
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.ToTable("products");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.Product)
                    .IsRequired()
                    .HasColumnName("product")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SaleMode)
                    .HasColumnName("sale_mode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_products_category");
            });

            modelBuilder.Entity<ProductsProducer>(entity =>
            {
                entity.ToTable("productsProducer");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdProducer).HasColumnName("id_producer");

                entity.Property(e => e.IdProduct).HasColumnName("id_product");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdProducerNavigation)
                    .WithMany(p => p.ProductsProducer)
                    .HasForeignKey(d => d.IdProducer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_productsProducer_producers");

                entity.HasOne(d => d.IdProductNavigation)
                    .WithMany(p => p.ProductsProducer)
                    .HasForeignKey(d => d.IdProduct)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stock_products");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.ToTable("user");

                entity.Property(e => e.IdUser)
                    .HasColumnName("id_user")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate)
                    .IsRequired()
                    .HasColumnName("birth_date")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");

                entity.Property(e => e.Rol)
                    .IsRequired()
                    .HasColumnName("rol")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
