package br.com.anagropets.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ObjetoPaginadoDTO {
	private int page;
	private int pageSize;
	private String orderingField;
	private String orderingDirection;
}
