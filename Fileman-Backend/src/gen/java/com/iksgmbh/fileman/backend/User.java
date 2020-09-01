package com.iksgmbh.fileman.backend;

import java.io.Serializable;
import java.lang.Integer;
import java.lang.String;

import javax.validation.constraints.*;
import javax.persistence.*;

import io.swagger.annotations.*;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

/**
 * JavaBean class of the MOGLiCC JavaBean Group.
 *
 * Data of a Fileman user
 *
 * This file is autogenerated by MOGLiCC. Do not modify manually!
 */
@ApiModel(description = "Data of a Fileman user")
@Entity
@Table(name="USER")
public class User implements Serializable
{
	private static final long serialVersionUID = 1598973593128L;

	// ===============  instance fields  ===============

    @Column(name="ID", unique=true, columnDefinition="int")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @NotNull(message="Value of mandatory attribute 'name' is not present.")
    @Size(min=2, max=64, message="Value of attribute 'name' is out of valid range (2-64)")
    @ApiModelProperty(notes = "Mandatory. Valid length ranges from 2 to 64.")
    @Column(name="NAME", unique=true, columnDefinition="varchar")
	private String name;

    @NotNull(message="Value of mandatory attribute 'role' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
    @Column(name="ROLE", columnDefinition="varchar")
	private String role;

    @NotNull(message="Value of mandatory attribute 'tenant' is not present.")
    @ApiModelProperty(notes = "Mandatory.")
    @Column(name="TENANT", columnDefinition="int")
	private Integer tenant;

    @Size(min=1, max=60, message="Value of attribute 'password' is out of valid range (1-60)")
    @ApiModelProperty(notes = "Valid length ranges from 1 to 60.")
    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name="PASSWORD", columnDefinition="varchar")
	private String password;

    @Size(min=1, max=60, message="Value of attribute 'passwordRepetition' is out of valid range (1-60)")
    @ApiModelProperty(notes = "Valid length ranges from 1 to 60.")
    @JsonProperty(access = Access.WRITE_ONLY)
    @Transient
	private String passwordRepetition;

    @Column(name="AVATAR", columnDefinition="clob")
    @Lob
	private String avatar;


	// ===============  setter methods  ===============

	public void setId(final Integer id)
	{
		this.id = id;
	}

	public void setName(final String name)
	{
		this.name = name;
	}

	public void setRole(final String role)
	{
		this.role = role;
	}

	public void setTenant(final Integer tenant)
	{
		this.tenant = tenant;
	}

	public void setPassword(final String password)
	{
		this.password = password;
	}

	public void setPasswordRepetition(final String passwordRepetition)
	{
		this.passwordRepetition = passwordRepetition;
	}

	public void setAvatar(final String avatar)
	{
		this.avatar = avatar;
	}

	// ===============  getter methods  ===============

	public Integer getId()
	{
		return id;
	}

	public String getName()
	{
		return name;
	}

	public String getRole()
	{
		return role;
	}

	public Integer getTenant()
	{
		return tenant;
	}

	public String getPassword()
	{
		return password;
	}

	public String getPasswordRepetition()
	{
		return passwordRepetition;
	}

	public String getAvatar()
	{
		return avatar;
	}

	// ===============  additional Javabean methods  ===============

	@Override
	public String toString()
	{
		return "User ["
				+ "id = " + id + ", "
				+ "name = " + name + ", "
				+ "role = " + role + ", "
				+ "tenant = " + tenant + ", "
				+ "password = " + password + ", "
				+ "passwordRepetition = " + passwordRepetition + ", "
				+ "avatar = " + avatar + ""
				+ "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;

		final User other = (User) obj;

		if (id == null)
		{
			if (other.id != null)
				return false;
		} else
		{
			if (! id.equals(other.id))
				   return false;
		}
		if (name == null)
		{
			if (other.name != null)
				return false;
		} else
		{
			if (! name.equals(other.name))
				   return false;
		}
		if (role == null)
		{
			if (other.role != null)
				return false;
		} else
		{
			if (! role.equals(other.role))
				   return false;
		}
		if (tenant == null)
		{
			if (other.tenant != null)
				return false;
		} else
		{
			if (! tenant.equals(other.tenant))
				   return false;
		}
		if (password == null)
		{
			if (other.password != null)
				return false;
		} else
		{
			if (! password.equals(other.password))
				   return false;
		}
		if (passwordRepetition == null)
		{
			if (other.passwordRepetition != null)
				return false;
		} else
		{
			if (! passwordRepetition.equals(other.passwordRepetition))
				   return false;
		}
		if (avatar == null)
		{
			if (other.avatar != null)
				return false;
		} else
		{
			if (! avatar.equals(other.avatar))
				   return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((tenant == null) ? 0 : tenant.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((passwordRepetition == null) ? 0 : passwordRepetition.hashCode());
		result = prime * result + ((avatar == null) ? 0 : avatar.hashCode());

		return result;
	}


	public void merge(User otherUser)
	{
        if (otherUser.getId() != null) {
            this.setId(otherUser.getId());
       }
        if (otherUser.getName() != null) {
            if(! otherUser.getName().isEmpty()) {
           	 this.setName(otherUser.getName());
            }
       }
        if (otherUser.getRole() != null) {
            if(! otherUser.getRole().isEmpty()) {
           	 this.setRole(otherUser.getRole());
            }
       }
        if (otherUser.getTenant() != null) {
            this.setTenant(otherUser.getTenant());
       }
        if (otherUser.getPassword() != null) {
            if(! otherUser.getPassword().isEmpty()) {
           	 this.setPassword(otherUser.getPassword());
            }
       }
        if (otherUser.getPasswordRepetition() != null) {
            if(! otherUser.getPasswordRepetition().isEmpty()) {
           	 this.setPasswordRepetition(otherUser.getPasswordRepetition());
            }
       }
        if (otherUser.getAvatar() != null) {
            if(! otherUser.getAvatar().isEmpty()) {
           	 this.setAvatar(otherUser.getAvatar());
            }
       }
	}
}