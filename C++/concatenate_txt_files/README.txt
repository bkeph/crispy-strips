Concatenates any number of .txt files, in the specified order.

Edit the input.txt file, while entering a file name to
	concatenate on each line.

To use the program, 
	download concatenate_txt_files.exe file from
	the Debug folder into the folder where the files
	to be concatenated are, create an input.txt file
	with the specified format, and execute 
	concatenate_txt_files.exe.

Each end of line of the output contains '\n'.

Example:

	input.txt:
		
		a.txt
		b.txt
		c.txt
	
	a.txt:
		a1
		a2
		
	b.txt:
		b1
		b2
		
	c.txt:
		c1
		c2
	
	
The output will be:
	
	output.txt:
		a1
		a2
		b1
		b2
		c1
		c2