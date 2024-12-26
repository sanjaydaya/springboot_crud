package com.demo.spring_crud.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String name;
    private Integer age;
    private String address;
}
