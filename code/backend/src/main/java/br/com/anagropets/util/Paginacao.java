package br.com.anagropets.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Paginacao {
	private int page;
	private int pageSize;
	private int totalPages;
	private Long totalElements;
	private String orderingField;
	private String orderingDirection;

}
