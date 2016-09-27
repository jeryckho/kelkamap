use Data::Dumper;
use JSON qw( );
our $JS = JSON->new;

my $Map = {
	Hexs => {},
	Focus => {
		Hexs => {},
		City => '',
		Nation => '',
		Over => '',
	},
	Population => {
		Village => 500000,
		Ville => 1000000,
		Capitale => 2000000,
		'Grande-Ville' => 2000000,
	}
};

my $Hexs = {};
my $Ctys = {};
my $Rsss = {};

my( $NatFile ) = XTsv("Nations.tsv");
my( $CtyFile ) = XTsv("Cities.tsv");
my( $RssFile ) = XTsv("Ressources.tsv");
my( $HexFile ) = XTsv("Hexagones.tsv");

foreach my $hex (@{ $HexFile }) {
	push(@{ $Hexs->{ $hex->{Nation} } }, $hex->{Hexagone}); 
}

foreach my $rss (@{ $RssFile }) {
	push(@{ $Rsss->{ $rss->{Nation} } }, { Nom => $rss->{Nom}, Type => $rss->{Type}, H => $rss->{H}, Qte => $rss->{'Qté'} }); 
}

foreach my $cty (@{ $CtyFile }) {
	push(@{ $Ctys->{ $cty->{Nation} } }, $cty->{Nom}); 
	$Map->{Cities}{ $cty->{Nom} } = {
		H => $cty->{Hexagone},
		Type => $cty->{Type},
		Desc => $cty->{Description}?$cty->{Description}:'',  
	};
}

foreach my $nat (@{ $NatFile }) {
	$Map->{Nations}{ $nat->{Code} } = {
		Nom => $nat->{Nom},
		NomLong => $nat->{NomLong}?$nat->{NomLong}:'',
		Couleur => $nat->{Couleur}?$nat->{Couleur}:'',
		Cities => $Ctys->{ $nat->{Nom} }?$Ctys->{ $nat->{Nom} }:[],
		Hexs => $Hexs->{ $nat->{Nom} }?$Hexs->{ $nat->{Nom} }:[],
		Ressources => $Rsss->{ $nat->{Nom} }?$Rsss->{ $nat->{Nom} }:[]
	};
}

print $JS->canonical->encode( $Map );

exit(0);

sub File2String ($;@) 	{
	my($name) = shift(@_);
	my(@variables) = @_;
	my($Template) = "";

	open(FIC,"<$name");
	while (<FIC>) {$Template .= $_;}
	close(FIC);
	return sprintf('%s', String2String($Template, @variables));
}

sub String2File ($$$;@) {
	my($name) = shift(@_);
	my($chen) = shift(@_);
	my(@variables) = @_;

	open(FIC,">$name");
	print FIC sprintf('%s', String2String($chen, @variables));
	close(FIC);
}

sub String2String ($$;@) {
	my($string,@variables) = @_;
	my($name,$interpolant);

	while($name=shift(@variables))
	{
		$interpolant = shift(@variables);
		$string =~ s/$name/$interpolant/g;
	}
	return $string;
}

sub XTsv ($){
	my($TRes) = [];

	open(FIC,'<' . $_[0]);
	chomp( my( @ligs ) = <FIC> );
	close(FIC);

	my($entetes) = shift @ligs;
	my(@head) = map { s/^\s+|\s+$//g; $_; } split( /\t/, $entetes );

	foreach my $lig (@ligs) {
		my(%Res);
		@Res{@head} = map { s/^\s+|\s+$//g; s/"/\\"/g; $_; } split( /\t/, $lig );
		push( @{$TRes}, \%Res );
	}
	return $TRes;
}