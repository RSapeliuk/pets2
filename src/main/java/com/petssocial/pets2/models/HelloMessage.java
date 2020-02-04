package com.petssocial.pets2.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class HelloMessage {

    private String name;
    private String fromId;
    private String toId;
}
